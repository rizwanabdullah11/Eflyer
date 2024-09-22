router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send('User already exists');
        }

        user = new User({
            fullName,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
