import User from '../models/User.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll(); // same as 'SELECT * FROM users'
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

export const getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id; // Extract the ID from request parameters
      const user = await User.findByPk(userId); //same as 'SELECT * FROM users WHERE id = ?'
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Error fetching user by ID' });
    }
  };

export const updateUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;
  
      // Find the user by ID
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      // Update user attributes
      user.name = name;
      user.email = email;
      user.password = password;

      // Save the updated user to the database
      await user.save();
  
      res.json({ message: 'user updated successfully' });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  };


export const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      // Delete the user
      await user.destroy();
  
      res.json({ message: 'user deleted successfully' });
    } catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  };

