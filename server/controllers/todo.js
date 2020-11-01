module.exports = (router, service) => {
    router.get('/api/v1/todos', async (req, res) => {
        try {
            const result = await service.getTodo();
            res.json({ data: result });
        } catch (e) {
            res.json(e);
        }
    });
    router.post('/api/v1/todos', async (req, res) => {
        try {
            const content = req.body.content;
            if (content == null || content === '') {
                res.status(400).json({ error: 'invalid', reason: 'content' });
            }
            const result = await service.createTodo(content);
            res.json({ data: result });
        } catch (e) {
            res.json(e);
        }
    });
    router.put('/api/v1/todos', async (req, res) => {
        try {
            const content = req.body.content;
            const id = req.body.id;
            if (content == null) {
                res.status(400).json({ error: 'invalid', reason: 'content' });
            }
            if (id == null) {
                res.status(400).json({ error: 'invalid', reason: 'id' });
            }
            const result = await service.updateTodo(id, content);
            res.json({ data: result });
        } catch (e) {
            res.json(e);
        }
    });
    router.delete('/api/v1/todos', async (req, res) => {
        try {
            const id = req.body.id;
            if (id == null) {
                res.status(400).json({ error: 'invalid', reason: 'id' });
            }
            const result = await service.deleteTodo(id);
            res.json({ data: result });
        } catch (e) {
            res.json(e);
        }
    });
    router.put('/api/v1/toggleTodo', async (req, res) => {
        try {
            const id = req.body.id;
            if (id == null) {
                res.status(400).json({ error: 'invalid', reason: 'id' });
            }
            const result = await service.toggleTodo(id);
            res.json({ data: result });
        } catch (e) {
            res.json(e);
        }
    });
}