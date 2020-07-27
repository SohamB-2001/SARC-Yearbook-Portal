const router = require('express').Router()
const bodyParser = require('body-parser');
const User = require('../models/user');

router.get('/profile/:id', async (req, res) => {
    const _id = req.params.id
    const user = await User.findById(_id)
      if(!user) {
        return res.status(400).send()
      }
      res.render('profile', {user : user})
  }) 
  
router.get('/profile/:id/edit', (req, res) => {
    res.render('edit-details', {id : req.params.id})
  }) 
  
router.get('/:id/nominate', (req, res) => {
    res.render('nominate', {id : req.params.id})
  })
  
router.get('/:id/notifications', async (req, res) => {
    id = req.params.id
    let user = await User.findById(id)
    const nominees = user.nominatedby
    res.render('notifications', {id:id, nomineelist:nominees})
    })
  
router.get('/:id1/:id2/caption', async (req, res) => {
    id1 = req.params.id1
    id2 = req.params.id2
    const user1 = await User.findById(id1)
    const user2 = await User.findById(id2)
    name = user1.name
    captions = user2.captions
    if(captions.find(o => o.name ===name )) {
      for(let i=0; i<captions.length; i++) {
        if(captions[i].name===name) {
          oldcaption = captions[i].caption
      }}
      name = user2.name
      res.render('caption', {id:id1, name:name, id2:id2, oldcaption:oldcaption})
    }
    else {
    name = user2.name
    res.render('caption', {id:id1, name:name, id2:id2})
    }
  })

router.get('/:id/search/:bitsid', async(req, res) => {
  let userid = req.params.id
  let resultid = req.params.bitsid
  const user = await User.findOne({bitsId : resultid})
  res.render('public-profile', {user : user, id : userid})
  })

router.get('/:id/upload', (req, res) => {
  let id = req.params.id
  res.render('upload', {id : id})
})

router.get('/:id/developers', (req, res) => {
  res.render('developers', {id : req.params.id})
})

router.get('/upload/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.set('Content-Type', 'image/png');
  res.send(user.img);
})

module.exports = router