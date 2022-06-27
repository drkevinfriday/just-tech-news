const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')




router.get('/', (req, res) => {
  Post.findAll({
    
  
    attributes: [
      'id',
       'post_url', 
       'title', 
       'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),'vote_count']
  ],
  order: [['created_at', 'DESC']],
    include: [
      // include the Comment model here:
   {
    model: Comment,
    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
    include: {
      model: User,
      attributes: ['username']
    }
  },
  {
    model: User,
    attributes: ['username']
  }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post=> post.get({ plain: true }))

      console.log(dbPostData[0]);
      // pass a single post object into the homepage template
      res.render('homepage',{posts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/', (req,res)=>{

//     res.render('homepage', {  id: 1,
//         post_url: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs',
//         created_at: new Date(),
//         vote_count: 10,
//         comments: [{}, {}],
//         user: {
//           username: 'test_user'
//         }})
// })

module.exports = router;
