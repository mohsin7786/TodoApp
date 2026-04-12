import Task from '../models/Task.model.js';

export const getTasks = async (req, res, next) => {
  try {
    const { search, completed, priority, category, startDate, endDate } = req.query;
    const filter = { user: req.user._id, deletedAt: null };
    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (startDate || endDate) {
      filter.dueDate = {};
      if (startDate) filter.dueDate.$gte = new Date(startDate);
      if (endDate) filter.dueDate.$lte = new Date(endDate);
    }
    const tasks = await Task.find(filter).sort({ order: 1, createdAt: -1 }).populate('assignedTo', 'name email avatar');
    res.json(tasks);
  } catch (err) { next(err); }
};

export const createTask = async (req, res, next) => {
  try {
    const count = await Task.countDocuments({ user: req.user._id });
    const task = await Task.create({ ...req.body, user: req.user._id, order: count });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, ...(req.body.completed ? { completedAt: new Date() } : { completedAt: null }) },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', task });
  } catch (err) { next(err); }
};

export const undoDelete = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { deletedAt: null },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
};

export const reorderTasks = async (req, res, next) => {
  try {
    const { orderedIds } = req.body;
    const ops = orderedIds.map((id, i) => ({ updateOne: { filter: { _id: id, user: req.user._id }, update: { order: i } } }));
    await Task.bulkWrite(ops);
    res.json({ message: 'Reordered' });
  } catch (err) { next(err); }
};

export const bulkDeleteCompleted = async (req, res, next) => {
  try {
    const result = await Task.updateMany({ user: req.user._id, completed: true }, { deletedAt: new Date() });
    res.json({ message: `${result.modifiedCount} tasks deleted` });
  } catch (err) { next(err); }
};

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const [total, completed, today, overdue] = await Promise.all([
      Task.countDocuments({ user: userId, deletedAt: null }),
      Task.countDocuments({ user: userId, completed: true, deletedAt: null }),
      Task.countDocuments({ user: userId, deletedAt: null, dueDate: { $gte: new Date(new Date().setHours(0,0,0,0)), $lte: new Date(new Date().setHours(23,59,59,999)) } }),
      Task.countDocuments({ user: userId, completed: false, deletedAt: null, dueDate: { $lt: new Date(new Date().setHours(0,0,0,0)) } }),
    ]);
    // Weekly data
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyCompleted = await Task.aggregate([
      { $match: { user: userId, completedAt: { $gte: weekAgo }, deletedAt: null } },
      { $group: { _id: { $dayOfWeek: '$completedAt' }, count: { $sum: 1 } } },
    ]);
    res.json({ total, completed, pending: total - completed, today, overdue, productivity: total > 0 ? Math.round((completed / total) * 100) : 0, weeklyCompleted });
  } catch (err) { next(err); }
};

export const exportTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id, deletedAt: null }).lean();
    const format = req.query.format || 'json';
    if (format === 'csv') {
      const headers = 'title,description,priority,category,completed,dueDate,tags\n';
      const rows = tasks.map(t => `"${t.title}","${t.description}","${t.priority}","${t.category}",${t.completed},"${t.dueDate || ''}","${(t.tags||[]).join(';')}"`).join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=tasks.csv');
      return res.send(headers + rows);
    }
    res.json(tasks);
  } catch (err) { next(err); }
};
