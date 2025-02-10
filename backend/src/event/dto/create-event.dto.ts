import { IsString, IsNotEmpty, Matches, IsOptional } from 'class-validator';
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
    // แปลง string "2025-05-01" เป็น Date โดยให้เวลาเป็น "00:00:00"
    const [year, month, day] = value.split('-');
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  })
  eventDate: Date;

  @IsString({ message: 'เวลาเริ่มต้นต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'เวลาเริ่มต้นไม่สามารถเป็นค่าว่างได้' })
  startTime: string;

  @IsString({ message: 'เวลาสิ้นสุดต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'เวลาสิ้นสุดไม่สามารถเป็นค่าว่างได้' })
  endTime: string;

  @IsOptional()
  @IsString({ message: 'Dress code ต้องเป็นข้อความ' })
  dressCode?: string;
}
