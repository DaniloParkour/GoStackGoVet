//Arquivo para conexão com o banco de dados
import { createConnection } from 'typeorm';

//Vai buscar o ormconfig.json (ou outra config) para iniciar a conexão
/*OBS: As configurações poderiam ser passadas por aqui tbm e não pelo arquivo mas as CLIs
não iriam funcionar pois os comandos não teriam um arquivo de configuração para se conectar ao
banco e gerar sua ação como criação de migrations*/
createConnection();

/*createConnection({
  "type": "postgres",
  "host": "192.168.99.100",
  "port": 5432,
  "username": "postgres",
  "password": "admindocker",
  "database": "govetapp"
});*/

