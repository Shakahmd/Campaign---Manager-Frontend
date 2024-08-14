import React, { useState, useRef } from 'react';
import { Card, Inset, Text } from '@radix-ui/themes';
import ColorPicker from './ColorPicker';
import toast,{Toaster} from 'react-hot-toast'
import { Button } from '@radix-ui/themes';



const EventCard = ({ imageUrl, onTargetInfo ,campaigns}) => {
  
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [dropX, setDropX] = useState(campaigns?.text_position?.x ?? 0);
  const [dropY, setDropY] = useState(campaigns?.text_position?.y ?? 0);
  const [fontSize, setFontSize] = useState(  campaigns && campaigns.text_font_size !== 'undefined' && campaigns.text_font_size !== undefined
  ? campaigns.text_font_size
  : '16px');
  const [textColor, setTextColor] = useState(campaigns ? campaigns.text_font_color:'#000000'); // Default color
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const imageRect = imageRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();
    const initialX = e.clientX;
    const initialY = e.clientY;

    const handleMouseMove = (e) => {
      const newX = textPosition.x + e.clientX - initialX;
      const newY = textPosition.y + e.clientY - initialY;

      // Ensure the element stays within the boundaries of the image
      const maxX = imageRect.width - textRect.width;
      const maxY = imageRect.height - textRect.height;
      const boundedX = Math.min(Math.max(newX, 0), maxX);
      const boundedY = Math.min(Math.max(newY, 0), maxY);

      // Update the text position
      setTextPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = (e) => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Calculate dropX and dropY based on the textPosition state
      const dropX = textPosition.x;
      const dropY = textPosition.y;

      setDropX(dropX);
      setDropY(dropY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleColorChange = (color) => {
    setTextColor(color); // Set the selected color
  };

  const sendTargetInfo = () => {

    const eventCardData = { x: dropX, y: dropY, fontSize: fontSize, textColor: textColor };
    onTargetInfo(eventCardData);
   toast.success('Text details added Successfully !')
  
  };

  return (
    <div className="mx-5 shadow-lg pt-6">
      <Inset clip="padding-box" side="top" pb="current" style={{ position: 'relative' }}>
        <div
          ref={textRef}
          className="text"
          style={{
            top: `${textPosition.y}px`,
            left: `${textPosition.x}px`,
            position: 'absolute',
            fontSize: fontSize,
            color: textColor,
            zIndex: isDragging ? 999 : 1, // Increase zIndex during dragging
          }}
          onMouseDown={handleMouseDown}
          draggable={!isDragging}
        >
          Drag Me
        </div>
        {imageUrl && (
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Bold typography"
            style={{
              display: 'block',
              objectFit: 'cover',
              width: imageUrl.width,
              height: imageUrl.height,
              backgroundColor: 'var(--gray-5)',
            }}
          />
        )}

      </Inset>

      <Card size="3" style={{ maxWidth: 550 }} ref={cardRef} className='mt-3'>
        <Text size="2" mb="1" weight="bold">Select the text color(Hex)</Text>
        <ColorPicker onColorChange={handleColorChange} />
        <div className='flex justify-between mt-3'>
          <Text size="2" mb="1" weight="bold">x</Text>
          <input type="text" value={dropX} onChange={(e) => setDropX(e.target.value)} className='border border-gray-300 w-9' />
          <Text size="2" mb="1" weight="bold">Y</Text>
          <input type="text" value={dropY} onChange={(e) => setDropY(e.target.value)} className='border border-gray-300 w-9' />
        </div>
        <div className='flex flex-col mt-3'>
          <Text size="2" mb="1" weight="bold">Font Size</Text>
          <input type="text" value={fontSize} onChange={handleFontSizeChange} className='border border-gray-300 ' />
        </div>

        <Button className='mt-2' onClick={sendTargetInfo}>
          Done
        </Button>
      
      </Card>
      <Toaster />
    </div>
  );
};

export default EventCard;
