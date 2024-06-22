import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import {Textarea} from "../../ui/Textarea.jsx";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";


function CreateCabinForm({cabinToEdit = {}}) {

    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId); // converting editId to, boolean to check

    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const {isCreating, createCabin} = useCreateCabin(reset);

    const {isEditing, editCabin} = useEditCabin(reset);

    const isWorking = isCreating || isEditing;

    const {errors} = formState; // getting errors when form submission

    function onSubmitFormData(data) {
        // console.log(data);
        const image = typeof data.image === 'string' ? data.image : data.image[0]

        if (isEditSession) {
            editCabin({newCabinData: {...data, image}, id: editId})
        } else {
            createCabin({...data, image: image});
        }
    }

    function onErrorFormData(errors) {
        //console.log(errors)
    }

// ----------------------------------------------------------------------------------------
    return (
        <Form onSubmit={handleSubmit(onSubmitFormData, onErrorFormData)}>

            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input type="text" id="name" disabled={isWorking}
                       {...register("name", {required: "This field is Required"})}/>
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" disabled={isWorking}
                       {...register("maxCapacity", {
                               required: "This field is Required",
                               min: {
                                   value: 1,
                                   message: "Capacity should be at least 1"
                               }
                           }
                       )}/>
            </FormRow>

            <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice",
                    {
                        required: "This field is Required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1"
                        }
                    })}/>
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" defaultValue={0} disabled={isWorking}
                       {...register("discount", {
                           required: "This field is Required",
                           validate: value => (value <= getValues().regularPrice) || 'Discount should be less than regular price'
                       })}/>
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea type="number" id="description" defaultValue=" "
                          disabled={isWorking} {...register("description",
                    {required: "This field is Required"})}/>
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image" accept="image/*"
                           {...register("image", {required: isEditSession ? false : "This field is Required"})}/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">Cancel</Button>
                <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create new cabin'}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
