const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const helmet        = require("helmet");
const morgan        = require("morgan");
const jwt           = require("jsonwebtoken");
const jwksRsa       = require("jwks-rsa");
var mongoose        = require('mongoose');
var bcrypt          = require("bcrypt"); 

require('dotenv').config();
// define the Express app
const app = express();

// the database
mongoose.connect('mongodb://localhost/qapp', {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error'));
db.once('open',function(){
    // we're connected!
});
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title : String,
    description : String,
    answers : Array
});
var UserSchema = new Schema({
    username : {type: String, required: true, unique: true},
    password : String,
    avatar   : String,
    bio      : String
});

var Question    = mongoose.model("Question",questionSchema);
var User        = mongoose.model("User",UserSchema);

//enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

//enable all CORS request
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


// retrieve all questions
app.get('/',async (req,res) =>{
    const questions = await Question.find({});
    const qs = questions.map(q => ({
       id           : q.id,
       title        : q.title,
       description  : q.description,
       answers      : q.answers.length
    }));
    res.send(qs);
});

// get a specific question
app.get('/:id', async (req,res) => {
    const {id} = req.params;
    const question = await Question.findById(id);
    if(!question)  return res.status(404).send();
    res.send(question);
});
// logout
app.get('/logout',  (req,res) => {
    res.status(200).send({auth : false,token : null});
});

// login
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    User.findOne({username :username}, function (err,user){
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid  = bcrypt.compareSync(password,user.password);
        console.log(passwordIsValid);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn : 86400 })
        
        res.status(200).send({user:user,auth:true,token :token});
    })
});

//insert a new question
app.post('/',authenticateToken, async (req,res) =>{
    const {title,description} = req.body;
    const newQuestion = new Question({
        title,
        description,
        answers : [],
    })
    const result = await newQuestion.save();
    console.log(result);
    res.status(200).send(result);
});

// insert a new answer to a question
app.post('/answer/:id',(req,res) =>{
    const {answer} = req.body;
    const answers = [];
    answers.push({answer});
    const {id} = req.params;
    Question.findByIdAndUpdate({_id : id},{answers : answers},function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      })
});
//insert a new user
app.post('/signup', async (req,res) =>{
    const {username,avatar,bio} = req.body;
    var {password} = req.body;
    password =  bcrypt.hashSync(password,10);
    console.log(password);
    const newUser = new User({
        username,
        password,
        avatar,
        bio
    })
    const result = await newUser.save();
    var token = jwt.sign({username :username},process.env.ACCESS_TOKEN_SECRET,{expiresIn : 86400})
    res.status(200).send({user:result,auth:true,token :token});
});

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorisation'];
    const token = authHeader && authHeader.split(' ') [1];
    if(token == null) return res.status(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if(err) return res.status(403);
        req.user = user;
        next();
    })
}

// start the server
app.listen(8081,() =>{
    console.log('listening on port 8081');
})