import { Label } from '../ui/label';
import { Input } from '../ui/input';

function ImageInput() {
  const name = 'image';
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        頭貼
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required
        accept='image/jpeg'
        className='max-w-xs'
      />
    </div>
  );
}
export default ImageInput;