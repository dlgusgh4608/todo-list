class TodoService {
    constructor(pool) {
        this._pool = pool;
    }

    async getTodo() {
        const result = await this._pool.query(`SELECT id, content, created_at, updated_at, completed_at FROM todos ORDER BY created_at ASC`);
        return result.rows;
    }

    async createTodo(content) {
        const result = await this._pool.query(`INSERT INTO todos(content) VALUES($1) RETURNING *`, [content]);
        if (result.rows[0] == null) {
            return null;
        }
        return result.rows[0];
    }

    async deleteTodo(id) {
        const result = await this._pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
        if (result.rows[0] == null) {
            return null;
        }
        return result.rows[0];
    }
    async updateTodo(id, content) {
        const result = await this._pool.query(`UPDATE todos SET content = $1, updated_at = NOW() WHERE id = $2`, [content, id]);
        if (result.rows[0] == null) {
            return null;
        }
        return result.rows[0];
    }
    async toggleTodo(id) {
        const complete = await this._pool.query(`SELECT completed_at FROM todos WHERE id = $1`, [id]);
        if (complete.rows[0].completed_at == null ) {
            const result = await this._pool.query(`UPDATE todos SET completed_at = NOW() WHERE id = $1`, [id]);
            if (result.rows[0] == null) {
                return null;
            }
            return result.rows[0];
        } else {
            const result = await this._pool.query(`UPDATE todos SET completed_at = NULL WHERE id = $1`, [id]);
            if (result.rows[0] == null) {
                return null;
            }
            return result.rows[0];
        }
    }
}
        
module.exports = TodoService;
