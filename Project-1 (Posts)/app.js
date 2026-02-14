const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const upload = require('./config/multerconfig');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render("index");
});


app.get('/profile/upload', (req, res) => {
    res.render("profileupload");
});

app.post('/upload', isLoggedIn ,upload.single('image'), async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect('/profile');
})


app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/profile', isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("posts");
    res.render("profile",{user});
});

app.get('/like/:id', isLoggedIn, async (req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }

    await post.save();
    res.redirect('/profile');
});


app.get('/edit/:id', isLoggedIn, async (req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");
    res.render("edit",{post});
});

app.post('/update/:id', isLoggedIn, async (req,res)=>{
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content});
    res.redirect('/profile');
});

// this will work as middleware to check if user is logged in or not, if logged in then it will pass the request to the next middleware otherwise it will render the login page
// only the logged in person will be able to access the profile page otherwise it will render the login page
app.post('/post', isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    let {content} = req.body;

    let post = await  postModel.create({
        content,
        user: user._id
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect('/profile');
});

app.post('/register', async (req,res)=>{
    const {username, name, age, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });

            let token = jwt.sign({email:email,userid:user._id},"secretkey");
            res.cookie("token",token);
            res.send("User registered successfully");
        });
    })
});

app.post('/login', async (req,res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("User not Registered");

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = jwt.sign({email:email,userid:user._id},"secretkey");
            res.cookie("token",token);
            res.status(200).redirect('/profile');
        }else{
            res.redirect('/login');
        }
    });
});

app.get('/logout', (req,res)=>{
    res.clearCookie("token");
    //res.cookie("token","");
    res.redirect('/login');
});

function isLoggedIn(req,res,next){
    let token = req.cookies.token;
    if(token == ""){
        res.render("login");
    }else{
        let data = jwt.verify(token,"secretkey");
        req.user = data;
        next();
    }
}

app.listen(3000);