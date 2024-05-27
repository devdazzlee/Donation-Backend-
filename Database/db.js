import mongoose from 'mongoose';
const mongodbURI = process.env.mongodbURI || "mongodb+srv://ahmedradiantcortex:ahmedradiantcortex@cluster0.sv2mcyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
/////////////////////////////////////////////////////////////////////////////////////////////////

const userSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});

const userModel = mongoose.model('Users', userSchema);

// Campaign Schema
const campaignSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    educationalLevel: { type: String, required: true },
    description: { type: String, required: true },
    requiredAmount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    createdOn: { type: Date, default: Date.now },
});

export const campaignModel = mongoose.model('Campaign', campaignSchema);


mongoose.connect(mongodbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

export default  userModel  