import UserInfo from "../models/userInfo.js";




const sellerLogin = async (req, res) => {
    try {
        const {userId, tokenId} = req.userId;
        console.log('this is userId and tokenId-->', userId);
        await UserInfo.findByIdAndUpdate(userId, { userRole: 'admin' });
        res.status(200).send({ message: 'User role updated to seller' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating user role', error });
    }
};

export {sellerLogin};