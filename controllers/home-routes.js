const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')




router.get('/', (req, res) => {
  console.log(req.session);

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
      
      res.render('homepage',{posts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req,res)=>{
  if (req.session.loggedin){
    res.redirect('/');
    return
  }


  res.render('login')
})


module.exports = router;
