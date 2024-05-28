import express from 'express';
import bodyParser from 'body-parser';
import userModel, {  campaignModel } from './Database/db.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8000
app.use(cors({
    origin: [   'http://localhost:3000'   , "*"],
    credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send('Ahmed Raza Jafri' + new Date().toString());
})

//  Sign up  

app.post('/signup', async (req, res) => {
    try {
      const { userName, email, password } = req.body;
  console.log(req.body)
      // Check if the email already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create new user
      const newUser = new userModel({ userName, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup failed:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Login Endpoint

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user based on email and password
      const user = await userModel.findOne({ email, password });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or incorrect credentials' });
      }
  
      res.status(200).json({ message: 'User found', user });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
// Campaign Schema

app.post('/create-campaign', async (req, res) => {
    try {
        const { studentName, educationalLevel, description, requiredAmount, userId } = req.body;

        // Create a new campaign instance
        const newCampaign = new campaignModel({
            studentName,
            educationalLevel,
            description,
            requiredAmount,
            userId,
        });

        // Save the campaign to the database
        await newCampaign.save();

        res.status(201).json({ message: 'Campaign created successfully' });
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/campaigns', async (req, res) => {
    try {
      const campaigns = await campaignModel.find();
      res.json(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})