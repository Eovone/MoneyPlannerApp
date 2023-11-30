export interface FormProps{
    handleAlert: (success: boolean) => void;
    setAlertMessage: (message: string) => void;
    setIsAuthorized?: (isAuthorized: boolean) => void;
    setUsername?: (username: string) => void;
}