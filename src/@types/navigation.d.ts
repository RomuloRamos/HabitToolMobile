// Access the ReactNavigation namespace definition to get the RootParamList interface and add the applications Routes with its params (props).

export declare global {
    namespace ReactNavigation{
        interface RootParamList {
            home: undefined;
            new: undefined;
            habit: {
                date: string;
            }
        }
    } 
}