import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import { deleteUser } from '../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

function ConfirmDelete({ selectedUser, isAlert, setIsAlert }: any) {
  const dispatch = useDispatch();
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isAlert}
      onClose={() => setIsAlert(false)}
      className="grid place-items-center"
    >
      <div className="bg-white p-20 grid gap-y-5  ">
        <div className="text-lg text-center">Are you Sure ?</div>
        <div className="flex gap-x-5">
          <Button
            onClick={() => setIsAlert(false)}
            className="!bg-green-500 hover:!bg-green-600 !text-white !border-green-600"
            variant="contained"
          >
            No
          </Button>
          <Button
            onClick={async () => {
              console.log(selectedUser);

              dispatch(await deleteUser(selectedUser.uuid));
              setIsAlert(false);
            }}
            className="!bg-red-500 hover:!bg-red-600  !text-white !border-red-600"
            variant="contained"
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDelete;
