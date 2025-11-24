import { z } from 'zod'

const currentYear = new Date().getFullYear()

const minSellingDate = new Date(2020, 2, 20)   

const maxSellingDate = new Date()

const colorEnum = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA',
  'MARROM', 'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]

const Car = z.object({
  brand: z.string()
    .trim()
    .min(1, { message: 'Marca deve ter, no mínimo, 1 caractere.' })
    .max(25, { message: 'Marca pode ter, no máximo, 25 caracteres.' }),

  model: z.string()
    .trim()
    .min(1, { message: 'Modelo deve ter, no mínimo, 1 caractere.' })
    .max(25, { message: 'Modelo pode ter, no máximo, 25 caracteres.' }),

  color: z.enum(colorEnum, {
    message: 'Cor inválida. Selecione uma cor disponível.'
  }),

  year_manufacture: z.number({
      invalid_type_error: 'Ano de fabricação deve ser um número inteiro.'
    })
    .int({ message: 'Ano de fabricação deve ser inteiro.' })
    .min(1960, { message: 'Ano de fabricação não pode ser anterior a 1960.' })
    .max(currentYear, {
      message: `Ano de fabricação não pode ser posterior a ${currentYear}.`
    }),

  imported: z.boolean({
    invalid_type_error: 'O campo imported deve ser true ou false.'
  }),

  plates: z.string()
    .trim()
    .length(8, { message: 'A placa deve ter exatamente 8 caracteres.' }),

  selling_date: z.coerce.date()
    .min(minSellingDate, {
      message: 'A data de venda não pode ser anterior a 20/03/2020.'
    })
    .max(maxSellingDate, {
      message: 'A data de venda não pode ser posterior à data atual.'
    })
    .nullish(),

  selling_price: z.number({
      invalid_type_error: 'O preço deve ser um número.'
    })
    .min(5000, { message: 'O preço mínimo é R$ 5.000,00.' })
    .max(5000000, { message: 'O preço máximo é R$ 5.000.000,00.' })
    .nullish()
})

export default Car
