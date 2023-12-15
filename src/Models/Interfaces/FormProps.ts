export interface FormProps{
    handleAlert: (success: boolean) => void;
    setAlertMessage: (message: string) => void;
    setUserId?: (id: number) => void;
}