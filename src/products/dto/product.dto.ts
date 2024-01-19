import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({
    example: "https://example.com/images/profile.jpg",
    description: "Users avatar",
  })
  readonly avatar: string;
  @ApiProperty({ example: "Nike", description: "Snickers" })
  readonly title: string;
  @ApiProperty({
    example:
      "This API provides information about Nike sneakers. You can retrieve details about different models, their features, and availability.",
    description: "Description your product",
  })
  readonly description: string;
  @ApiProperty({ example: "100", description: "Product price" })
  readonly price: number;
  @ApiProperty({ example: "222333444", description: "Phone number" })
  readonly phone: number;
}
