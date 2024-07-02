import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {
    return (
        <Modal>
            <div>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>

                <Modal.Window name="cabin-form">
                    <CreateCabinForm/>
                </Modal.Window>
            </div>
        </Modal>
    )
}

export default AddCabin;
