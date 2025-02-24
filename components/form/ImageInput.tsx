import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ImageInputProps = {
  name: string
  label: string
  accept?: string
}

function ImageInput({ name, label, accept = 'image/jpeg' }: ImageInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required
        accept={accept}
        className='max-w-xs'
      />
    </div>
  );
}
export default ImageInput;