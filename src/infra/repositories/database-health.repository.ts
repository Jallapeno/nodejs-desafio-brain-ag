import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class DatabaseHealthRepository {
  constructor(private readonly em: EntityManager) { }

  async checkConnection(): Promise<boolean> {
    try {
      // Executa uma query simples para testar a conexão
      await this.em.getConnection().execute('SELECT 1');
      return true;
    } catch (error) {
      // Logar o erro ou tratá-lo conforme necessário
      console.error('Database connection error:', error);
      return false;
    } finally {
      // Fechar a conexão se necessário
      // Note: MikroORM geralmente gerencia conexões automaticamente, mas você pode querer fechar explicitamente em alguns casos.
      // await this.em.getConnection().close();
    }
  }
}
