export interface IUser {
    firstName: string
    lastName: string
    username: string
    password: string
}
export interface IAccount extends IUser {
	id: number;
	avatar: string;
	bio: string;
	isAccountPrivate: boolean;
}

export interface IContext {
    user: IAccount
    setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>
}