import { IsString, IsNotEmpty, IsOptional, Matches, IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateSongDto {
  @IsString({ message: 'ชื่อเพลงต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'ชื่อเพลงไม่สามารถเป็นค่าว่างได้' })
  songName: string;

  @IsOptional()  
  @IsString({ message: 'รายละเอียดของเพลงต้องเป็นข้อความ' })
  songDescription?: string;

  @IsInt({ message: 'ลำดับเพลงต้องเป็นตัวเลข' })
  @IsNotEmpty({ message: 'ลำดับเพลงไม่สามารถเป็นค่าว่างได้' })
  songOrder: number;

  @IsEnum( { message: 'คีย์เพลงต้องเป็นหนึ่งในคีย์ที่กำหนดไว้' })  // ตรวจสอบคีย์เพลง
  songKey: string;

  @IsString({ message: 'URL เพลงต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'URL เพลงไม่สามารถเป็นค่าว่างได้' })
  songReference: string;  

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักร้องต้องเป็นตัวเลข' })
  songVocalist?: number;

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักกีต้าร์ต้องเป็นตัวเลข' })
  songGuitarist?: number;

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักกลองต้องเป็นตัวเลข' })
  songDrummer?: number;

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักเบสต้องเป็นตัวเลข' })
  songBassist?: number;

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักเปียโนต้องเป็นตัวเลข' })
  songKeyboardist?: number;

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักดนตรีเสริมต้องเป็นตัวเลข' })
  songExtra?: number;

  @IsOptional()  
  @IsInt({ message: 'หมายเลขนักเปอร์คัชชันต้องเป็นตัวเลข' })
  songPercussionist?: number;
}
