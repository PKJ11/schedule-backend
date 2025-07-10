const cron = require('node-cron');
const Post = require('../models/Post');
const { sendDailyReminder } = require('../utils/email');

// Timezone configuration for IST (UTC+5:30)
const timeZone = 'Asia/Kolkata';

// Run at 9:00 AM IST every day
cron.schedule('0 9 * * *', async () => {
  try {
    console.log('Running 9:00 AM reminder check at', 
      new Date().toLocaleString('en-IN', { timeZone }));
    const posts = await Post.find().populate('author', 'name');
    await sendDailyReminder(posts);
  } catch (error) {
    console.error('Error in 9:00 AM reminder job:', error);
  }
}, {
  scheduled: true,
  timezone: timeZone
});