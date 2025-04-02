# 🔄 Git Workflow em Equipe – Guia Didático

## ⏱️ Resumo: O Básico do Git no Dia a Dia

| Quando                 | O que fazer                                               | Comando                                                                       |
| ---------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **📌 ANTES DE CODAR**  | Pegar código atualizado                                   | `git pull origin main`                                                        |
| **📌 DURANTE O DEV**   | Ver o que mudou<br>Selecionar arquivos<br>Salvar mudanças | `git status`<br>`git add .`<br>`git commit -m "o que fiz"`                    |
| **📌 ANTES DE ENVIAR** | Atualizar novamente                                       | `git pull origin main`                                                        |
| **📌 COMO ENVIAR**     | Enviar seu código para o GitHub                           | `git add .`<br>`git commit -m "descreva o que fez"`<br>`git push origin main` |

> **Regra de ouro:** Sempre faça `git pull` antes de começar a programar e antes de fazer `push`!

## 🎯 Para que serve este guia?

- Criar um passo a passo claro para todo mundo do time
- Evitar conflitos e problemas quando juntamos o código
- Garantir que todos estejam com o código atualizado
- Facilitar o trabalho em equipe

## 📚 O Git em palavras simples

> 💡 **Pense no Git como um "álbum de fotos" do seu código**
>
> - Cada commit é como tirar uma foto do seu código naquele momento
> - O repositório é a pasta onde guardamos todas as fotos
> - Pull = baixar as fotos que outros tiraram
> - Push = enviar suas fotos para os outros

| Palavra         | O que significa na prática                                                  |
| --------------- | --------------------------------------------------------------------------- |
| **Repositório** | A pasta com todo o histórico do projeto                                     |
| **Commit**      | Salvar suas mudanças com uma descrição                                      |
| **Branch**      | Versão paralela do código (usamos principalmente a `main`)                  |
| **Pull**        | Baixar as atualizações do GitHub para seu PC                                |
| **Push**        | Enviar suas mudanças do PC para o GitHub                                    |
| **Merge**       | Juntar código de diferentes pessoas                                         |
| **Conflito**    | Quando você e outro dev mudaram o mesmo trecho e o Git não sabe qual manter |

---

## 🚀 Fluxo de Trabalho Completo

### 📆 **PASSO 1: Antes de Começar a Programar**

⚠️ **Por que isso é importante**: Começar com código desatualizado vai dar dor de cabeça depois!

> **Exemplo prático:** É como pegar a versão errada de um documento compartilhado. Se você editar uma versão antiga e depois tentar salvar por cima da nova, vai perder o trabalho de todo mundo! O `git pull` é como "abrir o documento mais recente antes de editar".

1. Abra o terminal
2. Vá para a pasta do projeto:
   ```bash
   cd /caminho/para/seu/projeto
   ```
3. **MAIS IMPORTANTE**: Atualize seu código local:

   ```bash
   git pull origin main
   ```

   > 💡 **O que isso faz**: Baixa todas as mudanças que outros devs enviaram para o GitHub. Se pular esta etapa, terá problemas depois!

   > 🔍 **Exemplo do que aparece**:
   >
   > ```
   > $ git pull origin main
   > From github.com:empresa/projeto
   >  * branch            main       -> FETCH_HEAD
   > Updating a2b5d63..e7f8g92
   > Fast-forward
   >  arquivo.js | 25 +++++++++++++------------
   >  1 file changed, 13 insertions(+), 12 deletions(-)
   > ```

### 📋 **Como ver o que outros devs fizeram antes de começar?**

> 💡 **Dica valiosa**: Sempre bom saber o que mudou antes de começar a codar!

1. **Ver os commits recentes** (quem fez o quê):

   ```bash
   git pull origin main         # Primeiro atualize
   git log --oneline -10        # Mostra os últimos 10 commits
   ```

   Exemplo do que aparece:

   ```
   e7f8g92 Adiciona validação no formulário de cadastro
   a2b5d63 Corrige bug na página de pagamento
   8h3d9f1 Atualiza bibliotecas do projeto
   ```

2. **Ver exatamente o que mudou em um commit específico**:

   ```bash
   git show e7f8g92             # Use o código do commit que quer ver
   ```

3. **Ver o que mudou desde ontem**:

   ```bash
   git pull origin main
   git log --since="yesterday" --pretty=format:"%h - %an: %s"
   ```

4. **Usando o VS Code com GitLens** (jeito mais fácil):
   - Clique no ícone do GitLens na barra lateral
   - Veja o histórico de commits com as mudanças visualmente
   - Veja quem fez cada alteração, linha por linha

---

### ✍️ **PASSO 2: Durante o Desenvolvimento**

![Git Workflow](https://miro.medium.com/v2/resize:fit:720/format:webp/1*iL2J8k4ygQlg3xriKGimbQ.png)
_Como o Git funciona na prática_

1. Trabalhe normalmente no seu código.

2. Veja quais arquivos você modificou:

   ```bash
   git status
   ```

   > 💡 **O que isso mostra**: Lista todos os arquivos que você alterou, adicionou ou removeu.
   >
   > 🔍 **Exemplo do que aparece**:
   >
   > ```
   > $ git status
   > On branch main
   > Changes not staged for commit:
   >   (use "git add <file>..." to update what will be committed)
   >   (use "git restore <file>..." to discard changes in working directory)
   >         modified:   src/components/Button.js
   >         modified:   src/styles/main.css
   >
   > no changes added to commit (use "git add" and/or "git commit -a")
   > ```

3. Veja exatamente o que mudou em cada arquivo:
   ```bash
   git diff
   ```
   > 🔍 **Saída em vermelho** = código removido, **verde** = código adicionado
4. Adicione as mudanças para o próximo commit:

   ```bash
   git add .    # Adiciona todas as mudanças
   ```

   ```bash
   git add arquivo1.js arquivo2.css    # Adiciona arquivos específicos
   ```

   > ⚠️ **Cuidado**: `git add .` adiciona TODAS as mudanças. Se você quiser ser mais seletivo, especifique os arquivos.

5. Crie um commit com uma mensagem clara:

   ```bash
   git commit -m "Adiciona validação de formulário na tela de login"
   ```

   > 👍 **Boas mensagens de commit**:
   >
   > - "Corrige bug no cálculo de frete"
   > - "Adiciona botão de voltar na tela de perfil"
   > - "Melhora performance da função de busca"
   >
   > 👎 **Mensagens ruins**:
   >
   > - "Fix"
   > - "Update"
   > - "Alterações"

   > 💡 **Dica**: É melhor fazer vários commits pequenos do que um único commit gigante.

   > **Fórmula simples para mensagens de commit:**
   >
   > ```
   > Verbo + o que fez + onde
   >
   > Exemplo: "Adiciona validação de email no cadastro"
   > Exemplo: "Corrige cálculo de frete no checkout"
   > ```

---

### 🚀 **PASSO 3: Antes de Enviar para o GitHub (Pull)**

⚠️ **Por que isso é importante**: Este passo evita que você apague o trabalho dos outros!

1. **SUPER IMPORTANTE**: Atualize novamente seu código:

   ```bash
   git pull origin main
   ```

   > 💡 **Por que fazer isso de novo?**: Outros devs podem ter enviado código novo enquanto você trabalhava!

---

### 🚀 **PASSO 4: Como Enviar para o GitHub (Push)**

1. **Certifique-se de que fez o pull** (passo anterior)

2. **Adicione mudanças** (caso tenha feito mais alguma):

   ```bash
   git add .
   ```

3. **Faça commit** (caso tenha feito mais mudanças):

   ```bash
   git commit -m "Descreva claramente o que você fez"
   ```

   > ⚠️ **IMPORTANTE**: Não esqueça de colocar o `-m` e a mensagem entre aspas!

4. **Envie para o GitHub**:

   ```bash
   git push origin main
   ```

   > 🎉 **Quando dá certo**:
   >
   > ```
   > $ git push origin main
   > Enumerating objects: 5, done.
   > Counting objects: 100% (5/5), done.
   > Delta compression using up to 8 threads
   > Compressing objects: 100% (3/3), done.
   > Writing objects: 100% (3/3), 328 bytes | 328.00 KiB/s, done.
   > Total 3 (delta 2), reused 0 (delta 0)
   > To github.com:empresa/projeto.git
   >    a2b5d63..e7f8g92  main -> main
   > ```

#### Se aparecer erro de "branches divergentes" (como no exemplo abaixo):

```
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
fatal: Need to specify how to reconcile divergent branches.
```

**O que isso significa?** Você e seu colega trabalharam ao mesmo tempo, e o Git não sabe como juntar as mudanças.

**Como resolver (opção 1 - mais simples):**

```bash
git pull --no-rebase
git push origin main
```

**Como resolver (opção 2 - mais limpa):**

```bash
git pull --rebase
git push origin main
```

**Configurar uma vez para sempre:**

```bash
git config pull.rebase false  # Para sempre usar merge
```

Depois disso você só precisa usar `git pull` e `git push` normalmente.

---

#### Se **houver conflitos**:

> ⚠️ **O que é um conflito?** É quando você e outro dev mudaram a mesma linha de código. O Git fica confuso e não sabe qual versão manter.
>
> **Exemplo simples:** É como se você e seu colega estivessem editando a mesma linha de um texto ao mesmo tempo - qual versão é a correta?

![Git Conflict](https://i.stack.imgur.com/FLjMV.png)
_Como um conflito aparece no VS Code_

1. Você verá uma mensagem como esta:

   ```
   CONFLICT (content): Merge conflict in arquivo.js
   Automatic merge failed; fix conflicts and then commit the result.
   ```

2. Abra o arquivo com problema no VS Code. Você verá algo assim:

   ```javascript
   function calcularTotal() {
   <<<<<<< HEAD
     // Seu código (o que está no seu PC)
     return valor + taxa;
   =======
     // Código do GitHub (o que estava lá)
     return (valor + taxa) * desconto;
   >>>>>>> origin/main
   }
   ```

3. Resolva o conflito escolhendo o código certo:

   - Apague as linhas com `<<<<<<< HEAD`, `=======` e `>>>>>>> origin/main`
   - Escolha qual código manter, ou combine os dois
   - Exemplo de como ficaria resolvido:

   ```javascript
   function calcularTotal() {
     // Versão final combinada
     return (valor + taxa) * desconto;
   }
   ```

4. Salve o arquivo.

5. Finalize o merge:
   ```bash
   git add .
   git commit -m "Resolve conflito na função calcularTotal"
   git push origin main
   ```

---

### 👥 **PASSO 5: O Que o Outro Desenvolvedor Deve Fazer Depois**

1. Acesse a pasta do projeto:

   ```bash
   cd /caminho/para/o/projeto
   ```

2. Baixe as mudanças:

   ```bash
   git pull origin main
   ```

3. Agora está tudo atualizado para continuar programando.

---

### 📊 **Como Ver o Histórico de Mudanças**

- Ver commits recentes (mais útil para o dia a dia):

  ```bash
  git log --oneline
  ```

  > 🔍 **Exemplo**:
  >
  > ```
  > $ git log --oneline
  > e7f8g92 (HEAD -> main, origin/main) Adiciona validação de formulário
  > a2b5d63 Corrige estilo dos botões na página inicial
  > 8h3d9f1 Implementa feature de busca avançada
  > ```

- Ver o conteúdo detalhado de um commit específico:

  ```bash
  git show e7f8g92
  ```

- Ver o que foi modificado entre dois commits:

  ```bash
  git diff 8h3d9f1 e7f8g92
  ```

- Ver alterações que ainda não foram commitadas:
  ```bash
  git diff
  ```

---

## 📋 **Como o Git Funciona - Visão Geral**

![Git Workflow Diagram](https://www.nobledesktop.com/image/gitresources/git-branches-merge.png)
_Como o Git funciona entre seu PC e o GitHub_

O diagrama acima mostra o fluxo de trabalho:

1. Seu computador (repositório local)
2. A área de preparação (onde você escolhe o que vai entrar no commit)
3. O GitHub (repositório online)

## 🤝 **O que acontece quando dois devs trabalham juntos?**

### Cenário 1: Vocês modificam arquivos DIFERENTES

![Different Files](https://static.javatpoint.com/tutorial/git/images/git-merge.png)
_Quando cada dev trabalha em um arquivo diferente_

**Do seu ponto de vista:**

1. Você adiciona/modifica o arquivo `login.js`
2. Seu colega, sem saber, modifica outro arquivo (`dashboard.js`)
3. Ele faz commit e push primeiro
4. Quando você der `git pull`:
   - Git baixará as mudanças dele (no `dashboard.js`)
   - Como eram arquivos diferentes, **NÃO haverá conflito**
   - Você verá algo como: "Updating abc123..def456, Fast-forward"
5. Quando você der `git push`, seu `login.js` será enviado sem problemas

**Do ponto de vista do seu colega:**

1. Ele modifica `dashboard.js` e faz push normalmente
2. Mais tarde, quando ele fizer `git pull`, receberá seu novo arquivo `login.js`
3. Tudo funciona tranquilamente, sem nenhum problema

### Cenário 2: Vocês modificam o MESMO arquivo

![Same File Conflict](https://wac-cdn.atlassian.com/dam/jcr:86eba9ec-9391-45ea-800a-948cec1f2ed7/Branch-2.png)
_Quando ambos modificam o mesmo arquivo, o segundo precisa resolver_

**Do seu ponto de vista:**

1. Você modifica o arquivo `usuario.js`
2. Seu colega também modifica o mesmo arquivo sem saber
3. Ele faz commit e push primeiro
4. Quando você der `git pull`:
   - Se vocês modificaram partes diferentes do arquivo, Git resolve sozinho
   - Se vocês alteraram as mesmas linhas, você verá:
     ```
     CONFLICT (content): Merge conflict in usuario.js
     Automatic merge failed; fix conflicts and then commit the result.
     ```
5. Você precisará:
   - Abrir o arquivo e resolver o conflito (escolher qual versão manter)
   - Fazer `git add usuario.js`
   - Fazer `git commit -m "Resolve conflito no usuario.js"`
6. Só depois disso você poderá fazer `git push`

**Do ponto de vista do seu colega:**

1. Ele modifica `usuario.js` e faz push normalmente
2. Ele não terá conflitos porque enviou primeiro
3. Depois que você resolver o conflito, quando ele fizer pull, receberá a versão final

> 💡 **Conclusão importante**: Quem faz push primeiro "vence" - o segundo dev precisa resolver os conflitos. Por isso é tão importante fazer pull com frequência!

### Cenário 3: Mesmo com arquivos diferentes - branches divergentes

**O que acontece:**

1. Você adiciona um novo arquivo (ex: `git-workflow.md`)
2. Seu colega modifica outro arquivo (ex: `Gameinicial.js`)
3. Seu colega faz push primeiro
4. Você faz commit local, mas **mesmo sem conflito de conteúdo**, quando tenta fazer pull, aparece:
   ```
   hint: You have divergent branches and need to specify how to reconcile them.
   hint: You can do so by running one of the following commands
   ...
   fatal: Need to specify how to reconcile divergent branches.
   ```

**Por que isso acontece?** Porque o Git não está apenas preocupado com o conteúdo dos arquivos, mas com a **linha do tempo** dos commits!

**Como resolver:**

```bash
git pull --no-rebase     # Opção que cria um commit de merge
git push origin main
```

**OU (melhor para repositórios maiores):**

```bash
git pull --rebase        # Reordena seus commits como se tivesse feito pull antes
git push origin main
```

**Configurar de uma vez:**

```bash
git config pull.rebase false  # Escolha merge como padrão
```

> 💡 **Dica**: Mesmo sem conflito de conteúdo, pode haver conflito na linha do tempo, e isso é normal!

## 🌟 **Situações Comuns e Como Resolver**

### 🧠 **Caso 1: Conflito durante o Pull**

1. Você modificou arquivos locais e o GitHub também tem mudanças
2. Ao fazer `git pull`, aparece erro
3. **Solução rápida**: Guarde suas mudanças temporariamente
   ```bash
   git stash                # Guarda suas mudanças
   git pull origin main     # Atualiza com o GitHub
   git stash pop            # Recupera suas mudanças
   ```
   Agora resolva os conflitos normalmente

### 🧠 **Caso 2: "Ops, commitei na branch errada!"**

1. Veja qual foi seu último commit:
   ```bash
   git log --oneline -1
   ```
2. Desfaça o commit mantendo as mudanças:
   ```bash
   git reset --soft HEAD~1
   ```
3. Agora mude para a branch certa e faça o commit de novo

### 🧠 **Caso 3: "Quero descartar todas as minhas mudanças!"**

```bash
git restore .  # Descarta todas as mudanças não salvas
```

OU

```bash
git reset --hard HEAD  # Versão radical, cuidado!
```

### 🚨 **Caso de Emergência: "Fiz uma grande besteira, preciso voltar tudo!"**

> ⚠️ **Cuidado**: Estes comandos são como um "botão nuclear" - use apenas em emergências reais!

**Se você quer voltar o repositório LOCAL para uma versão anterior:**

1. Veja o histórico para encontrar o commit para onde quer voltar:

   ```bash
   git log --oneline -20
   ```

   Você verá algo assim:

   ```
   abc123 Commit mais recente (problemático)
   def456 Commit anterior
   ghi789 Commit ainda mais antigo (bom, quero voltar para este)
   ```

2. Volte para o commit "bom":
   ```bash
   git reset --hard ghi789
   ```
   > ⚠️ Isso apaga TODAS as mudanças feitas depois desse commit!

**Se você precisa voltar o repositório LOCAL E REMOTO (GitHub):**

1. Primeiro volte localmente, como explicado acima:

   ```bash
   git reset --hard ghi789
   ```

2. Force o GitHub a aceitar sua versão antiga:

   ```bash
   git push --force origin main
   ```

   > 🚨 **SUPER IMPORTANTE**: Este comando sobrescreve o GitHub e apaga permanentemente commits. Todos da equipe precisarão fazer git pull após isso! Use apenas em situações realmente críticas e avise o time!

3. Avise todos os outros desenvolvedores para fazerem:
   ```bash
   git fetch origin
   git reset --hard origin/main
   ```

**Opção mais segura (recomendada)**: Em vez de apagar o histórico, crie um novo commit que desfaz as mudanças:

```bash
git revert abc123
```

Isso cria um novo commit que desfaz as mudanças do commit problemático, sem apagar o histórico.

---

## 👨‍💻 **Ferramentas que Facilitam sua Vida**

### 🏠 **VS Code com GitLens (Super Recomendado)**

- [GitLens (para VS Code)](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  - Mostra quem escreveu cada linha de código
  - Compara versões antigas com as atuais
  - Vê histórico de qualquer arquivo com 2 cliques

### 🏠 **GitHub Desktop**

- Interface visual para Git (sem precisar de comandos)
- Perfeito para iniciantes
- [Baixar GitHub Desktop](https://desktop.github.com/)

---

## 🚨 **Erros Comuns que Todo Mundo Comete**

![Common Git Mistakes](https://res.cloudinary.com/practicaldev/image/fetch/s--DvPd0c_p--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v3qz90pzp7gy72669n4q.png)
_O jeito certo vs. problemas comuns_

1. **Erro**: Fazer commit direto na `main` quando deveria estar em uma branch separada
   **Solução**: Criar branches para cada feature nova

2. **Erro**: Mensagens de commit tipo "Ajuste" ou "Fix"
   **Solução**: Escrever o que realmente foi feito, tipo "Corrige cálculo de imposto"

3. **Erro**: Não fazer `pull` antes de começar a programar
   **Solução**: Sempre comece seu dia com `git pull origin main`

4. **Erro**: Deixar conflitos se acumularem
   **Solução**: Resolva eles logo que aparecerem, quando são pequenos

5. **Erro**: Usar `push --force` para resolver problemas
   **Solução**: Nunca use `--force` em branches compartilhadas, isso pode apagar o trabalho de outras pessoas

---

## 🚚 **Resumo: O que fazer todo dia (Checklist)**

![Git Workflow Cheatsheet](https://www.stevejgordon.co.uk/wp-content/uploads/2018/03/GitWorkflowBasic.png)
_O ciclo diário do Git_

### ✅ Antes de codar:

- [ ] `git pull origin main`

### ✅ Durante:

- [ ] `git status` (veja o que mudou)
- [ ] `git add .` (selecione os arquivos)
- [ ] `git commit -m "O que você fez"`

### ✅ Antes de enviar:

- [ ] `git pull origin main`

### ✅ Como enviar:

- [ ] `git add .` (se fez mais mudanças)
- [ ] `git commit -m "Descreva as mudanças"` (se fez mais mudanças)
- [ ] `git push origin main`

### ✅ Para todos os devs:

- [ ] `git pull origin main` antes de qualquer coisa

---

## 💡 **Comandos Úteis que Facilitam sua Vida**

### 🔎 **Ver o histórico e mudanças**

```bash
git log --oneline -10                                # Ver últimos 10 commits de forma resumida
git show abc123                                      # Ver detalhes de um commit específico
git log --author="nome.do.colega"                    # Ver commits de um dev específico
git log --since="2 days ago" --pretty=format:"%h %s" # Ver commits dos últimos 2 dias
git diff --name-only HEAD~3..HEAD                    # Ver apenas quais arquivos mudaram nos últimos 3 commits
```

### 📂 **Recuperar seu trabalho**

```bash
git stash                # Guardar mudanças temporariamente
git stash list           # Listar tudo que você guardou
git stash pop            # Recuperar as últimas mudanças guardadas
git checkout -- arquivo.js # Desfazer mudanças em um arquivo específico
```

---

## 📈 **Próximos Passos (Quando o Time Crescer)**

Quando a equipe ficar maior, considere usar:

- **Branches de feature**: Cada funcionalidade em uma branch separada
- **Pull Requests**: Revisão de código antes de integrar
- **Branch protection**: Impedir que código não revisado entre na main
- **CI/CD**: Testes automáticos para cada mudança

## 💬 **Perguntas que Todo Mundo Faz**

**P**: Quando devo fazer commit?
**R**: Sempre que completar uma tarefa pequena. Na prática, várias vezes por dia.

**P**: E se eu esquecer de fazer pull antes?
**R**: Quanto mais tempo passar, mais difícil será juntar o código. Faça pull assim que lembrar.

**P**: Posso usar uma interface visual em vez de comandos?
**R**: Sim! GitHub Desktop ou GitLens no VS Code são ótimas para iniciantes.

**P**: Como sei o que meus colegas fizeram recentemente?
**R**: Use `git log --oneline -10` após fazer `git pull` para ver os últimos 10 commits.

**P**: Por que está dando erro mesmo se eu só adicionei um arquivo novo?
**R**: O Git controla a ordem dos commits, não só o conteúdo. Use `git pull --no-rebase` para resolver.

---

## 🔍 **Diagrama Simples do Fluxo Git**

```
+--------------+     git add     +-------------+     git commit     +----------------+
| Seus Arquivos| --------------> | Área de     | -----------------> | Seu Repositório|
| Modificados  |                 | Preparação  |                    | Local (PC)     |
+--------------+                 +-------------+                    +----------------+
                                                                            |
                                                                            | git push
                                                                            v
                                                                    +----------------+
                                                                    | Repositório no |
                                    git pull                        | GitHub         |
                               <----------------------------------------+
```

---
