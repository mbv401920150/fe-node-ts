import { v4 as uuidv4 } from 'uuid';

class Task {
    id: string;
    desc: string;
    completedAt: Date;

    constructor(description: string) {
        this.id = uuidv4()
        this.desc = description;
        this.completedAt = null;
    }
}

export default Task