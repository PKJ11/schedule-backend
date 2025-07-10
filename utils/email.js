// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "logicologymeta@gmail.com",
    pass: "fdqz xqjx neoz nzan",
  },
});

exports.sendDailyReminder = async (posts) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    postDate.setHours(0, 0, 0, 0);
    return postDate.getTime() === today.getTime();
  });

  // Return early if no posts for today
  if (todaysPosts.length === 0) {
    console.log('No posts scheduled for today - no email sent');
    return;
  }

  const statuses = todaysPosts.map(post => post.status).join(', ');

  const mailOptions = {
    from: "logicologymeta@gmail.com",
    to: 'pratikkumarjha2002@gmail.com',
    subject: 'Daily Social Media Post Reminder',
    html: `
      <h2>Hi Amy,</h2>
      <p>There are ${todaysPosts.length} social media post(s) scheduled for today with status: ${statuses}</p>
      <p>Do You want to make a post?</p>
      <a href="https://comment-cal-media-flow.vercel.app/" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
      ">Create Post</a>
      <p>Or visit: <a href="https://comment-cal-media-flow.vercel.app/">https://comment-cal-media-flow.vercel.app/</a></p>
      <p>Best regards,<br>Your Social Media Team</p>
    `,
};

  try {
    await transporter.sendMail(mailOptions);
    console.log('Daily reminder email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};