//para extender el interfas de "user"

declare namespace Express{
    export interface Request{
        user: any
    }
}