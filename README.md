# Acervo Vivo — Mobiliário UFPE

Protótipo front-end de uma plataforma de acervo/restauro e redistribuição de mobiliário.

## O que já existe

- Página inicial minimalista.
- Catálogo com busca, filtros por tipo/status e ordenação.
- Cards de mobiliário.
- Página/modal individual da peça.
- Área preparada para visualização 3D via `<model-viewer>`.
- Campos para tombamento, origem, material, autoria e história.
- Carrinho de solicitação com persistência em `localStorage`.
- Login de protótipo.
- Fila de espera.
- Solicitação de novo mobiliário.
- Dashboard administrativo.
- Indicadores de disponibilidade, reservas e solicitações.
- Tabela de destinação/rastreabilidade.
- Exportação do acervo para CSV.
- Layout responsivo para desktop/tablet/celular.

## Estrutura

- `index.html` — estrutura da aplicação.
- `styles.css` — identidade visual e responsividade.
- `app.js` — dados de exemplo e interações.
- `models/` — coloque aqui os arquivos `.glb` ou `.gltf` reais das peças.

## Como adicionar um 3D

No `app.js`, cada item possui um campo como:

`model: "models/cadeira-escolar-68.glb"`

Basta colocar o arquivo correspondente na pasta `models/`.

Para produção, recomendo converter os modelos para `.glb` otimizado e manter versões leves para web.

## Próxima etapa recomendada

O protótipo está propositalmente sem backend. Para transformar em sistema real:

1. Autenticação institucional UFPE.
2. Banco de dados para patrimônio, peças, usuários, departamentos e solicitações.
3. Perfis de acesso: servidor, restaurador/pesquisador, patrimônio e administrador.
4. Fluxo de aprovação da solicitação.
5. Histórico de movimentação de cada peça.
6. Upload de fotos, documentos e modelos 3D.
7. Número de processo/protocolo.
8. Integração com o sistema patrimonial existente, caso exista API ou procedimento institucional.
9. Logs de auditoria.
10. Dashboard com gráficos e filtros por período/departamento.
11. Notificações por e-mail institucional.
12. Controle de retirada, entrega e termo de responsabilidade.

## Observação

Os nomes, números de tombamento, datas e histórias presentes no protótipo são fictícios e devem ser substituídos pelos dados reais do projeto.
