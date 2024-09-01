import React, { FormEvent, useEffect, useRef } from 'react';
import { Button, Col, Modal, Row, Form, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { useForm } from 'react-hook-form';
import InputText from '../../../common/InputText';
import { RsetShowModal } from '../../../common/slices/mainSlice';
import { paymantMethodItems } from '../../../utils/Options';
import FieldsAddPayMod from './FieldsAddPayMod';
import { TableStepValues, ValidSteps } from '../../../models/AllData.model';
import { RsetAllFieldSteps } from '../../../common/slices/taxSlice';
import Btn from '../../../common/Btn';
interface Props {
    handleAddItems: (data: TableStepValues) => void;
    setEditRowGoods: React.Dispatch<React.SetStateAction<{}>>
    editRowGoods: any;
}

const AddTablePay: React.FC<Props> = ({ editRowGoods, setEditRowGoods, handleAddItems }) => {
    const dispatch = useAppDispatch()
    const { tax, main } = useAppSelector(state => state)
    const { control, handleSubmit, formState: { errors }, clearErrors, reset, getValues, resetField, watch } = useForm<TableStepValues>({ reValidateMode: 'onChange' })

    useEffect(() => {
        reset({ ...editRowGoods })
    }, [editRowGoods])

    return (
        <>
            <Modal
                size='xl'
                keyboard={true}
                backdrop="static"
                centered
                show={main.showModal.showModal}
                onHide={() => dispatch(RsetShowModal({ showModal: false }))}
            >
                <Modal.Header style={{ transform: "scale(-1, 1)", direction: "ltr" }} className='d-flex justify-content-center bgSuccessWhite text-white' closeButton>
                    <span style={{ transform: "scale(-1, 1)" }} className='fw-bold'>
                        افزودن اطلاعات پرداخت کالا
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <Container >
                        <Form>
                            <Row>
                                <FieldsAddPayMod watch={watch} control={control} errors={errors} />
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer className='d-flex' >
                    <Btn
                        variant='outline-danger'
                        className=''
                        onClick={() => dispatch(RsetShowModal({ showModal: false }))}
                        title="لغو"
                    />
                    <Btn
                        variant="success"
                        onClick={handleSubmit((data: TableStepValues) => {
                            handleAddItems(data)
                            dispatch(RsetAllFieldSteps({ ...tax.allFieldSteps, step4: getValues() }))
                        }
                        )}
                        title='افزودن'
                    />
                </Modal.Footer>
            </Modal >
        </>
    )
};

export default AddTablePay;