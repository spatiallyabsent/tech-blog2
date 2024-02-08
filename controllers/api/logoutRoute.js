router.post('/logout', withAuth, (req, res) => {
    try {
      // Destroy the session
      req.session.destroy();
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });