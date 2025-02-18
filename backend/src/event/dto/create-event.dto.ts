import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  @IsString({ message: 'ชื่อกิจกรรมต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'ชื่อกิจกรรมไม่สามารถเป็นค่าว่างได้' })
  eventName: string;

  @Matches(
    /^\d{4}-\d{2}-\d{2}$/,
    { message: 'กรุณากรอกวันที่ในรูปแบบ yyyy-MM-dd' },
  )
  @Transform(({ value }) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;  // คืนค่าเป็น string ที่เป็น 'yyyy-MM-dd'
    }
    throw new Error('eventDate must be a valid string in the format yyyy-MM-dd');
  })
  eventDate: string;

  @IsNotEmpty({ message: 'เวลาเริ่มต้นไม่สามารถเป็นค่าว่างได้' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'กรุณากรอกเวลาเริ่มต้นในรูปแบบ HH:mm' })
  startTime: string;  // รูปแบบ "HH:mm"

  @IsNotEmpty({ message: 'เวลาสิ้นสุดไม่สามารถเป็นค่าว่างได้' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'กรุณากรอกเวลาสิ้นสุดในรูปแบบ HH:mm' })
  endTime: string;    // รูปแบบ "HH:mm"

  @IsString({ message: 'Dress code ต้องเป็นข้อความ' })
  dressCode: string;

  @IsString({ message: 'รายละเอียดเพิ่มเติมต้องเป็นข้อความ' })
  additionalDetails: string;
}
