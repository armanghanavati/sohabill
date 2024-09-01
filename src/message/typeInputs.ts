import { FormEvent } from "react";

export interface Inputs {
    name: string,
    value: string,
    validationNameList: string,
    event: FormEvent
}