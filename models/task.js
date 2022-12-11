import { v4 } from "uuid";

class Task {
    id = '';
    desc = '';
    completeEn = null;

    constructor(desc){
        this.id = v4();
        this.desc = desc;
        this.completeEn = null; 
    }
}

export {Task};