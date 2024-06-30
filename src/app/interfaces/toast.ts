
export enum ToastType {
    System = "system",
    Success = "success",
    Failed = "failed",
    Warning = "warning",
}

export class Toast {

    type: ToastType;
    title: string;
    message: string;
    duration?: number;

    constructor(type: ToastType, title: string, message: string, duration?: number) {
        this.type = type;
        this.title = title;
        this.message = message;
        if (duration)
            this.duration = duration;
        else
            this.duration = 4000;
    }
}