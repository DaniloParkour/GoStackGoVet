// As informações definidas aqui irão ADICIONAR as opções às definições de tipo já existentes
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
