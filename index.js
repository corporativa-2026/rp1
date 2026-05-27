/*
Considere um partida de volei:
- Cada partida tem um time da casa e um time visitante,
  que são definidos no início da partida e não podem ser alterados
- Cada partida tem um array de sets, que começa vazio e é preenchido
  à medida que os sets são jogados
- Cada set tem uma pontuação para cada time, que começa em 0 e é atualizada
  à medida que os pontos são marcados
- Um set termina quando um time alcança 25 pontos (sem regra de vantagem para simplificar)
- A partida termina quando um time vence 3 sets
- O módulo `voley.js` deve funcionar como especificado nos testes abaixo,
  que cobrem os casos de uso mais comuns e também alguns casos de borda
- Os console.log devem ser escritos na forma de vitest em voley.test.js
- Warnings do linter devem ser corrigidos, pois baixam a grade
- console.log está liberado mas não deve ser usado para debug,
  apenas para mostrar os resultados dos testes
- Deve ser possível executar o código (sem erros de sintaxe);
- Os "TODOs" no fim do arquivo devem ser implementados para completar os testes
  e garantir que o módulo `voley.js` esteja funcionando corretamente
*/

// index.js
import { newMatch } from './voley.js';

const match = newMatch('Não me Toque', 'Tio Hugo');

console.log(match.home); // Deve mostrar "Não me Toque" como o time da casa
console.log(match.visitor); // Deve mostrar "Tio Hugo" como o time visitante

// O time da casa e visitante não podem ser alterados diretamente
match.home = 'Outro Time'; // Deve causar um erro, comente esta linha para evitar o erro
match.visitor = 'Outro Time'; // Deve causar um erro, comente esta linha para evitar o erro

// Os times da casa e visitante não podem ser iguais
try {
  newMatch('Picada Café', 'Picada Café');
} catch (error) {
  console.error(error.message); // Home e Visitor teams cannot be the same
}

// Deve mostrar um array vazio, pois nenhum set foi jogado ainda
console.log(match.sets); // []

const set1 = match.newSet(); // Inicia um novo set

// há um set
console.log(match.sets); // [{...}]
console.log(match.sets.length === 1); // true

// set[0] é definido e retorna um objeto set
console.log(match.sets[0]); // {...}
console.log(match.firstSet); // {...}

console.log(match.secondSet); // undefined, mesmo que set[1]
console.log(match.thirdSet); // undefined, mesmo que set[2]
console.log(match.fourthSet); // undefined, ...
console.log(match.fifthSet); // undefined, ...

console.log(set1.scorePoint('Não me Toque') === 1); // retorna true, nro ponto para 'Não me Toque'
console.log(set1.scorePoint('Tio Hugo') === 1); // retorna true, nro ponto para 'Tio Hugo'
// Todos dão no mesmo objeto set
// retorna true, nro ponto para 'Não me Toque'
console.log(match.sets[0].scorePoint('Não me Toque') === 2);
// retorna true, nro ponto para 'Não me Toque'
console.log(match.firstSet.scorePoint('Não me Toque') === 3);

// 1 para o time da casa e 3 para o time visitante
console.log(set1.score); // [1, 3]
// podemos acessar o set através do match
console.log(match.sets[0].score); // [1, 3]

// a pontuação da partida é baseada no número de sets vencidos por cada time
console.log(match.score); // [0, 0]

console.log(set1.isOver); // false, o set ainda não terminou
console.log(set1.isRunning); // true, o set está em andamento
console.log(set1.winner); // undefined, ainda não há um vencedor

// Continuando a pontuação (true para todos os casos de teste)
console.log(set1.scorePoint('Tio Hugo') === 2); // 2 pontos para 'Tio Hugo'
console.log(set1.scorePoint('Tio Hugo') === 3); // 3 pontos para 'Tio Hugo'
console.log(set1.scorePoint('Tio Hugo') === 4); // 4 pontos para 'Tio Hugo'
console.log(set1.scorePoint('Tio Hugo', 2) === 6); // +2, 6 pontos para 'Tio Hugo'
console.log(set1.scorePoint('Tio Hugo', 3) === 9); // +3, 9 pontos para 'Tio Hugo'
console.log(set1.scorePoint('Tio Hugo', 4) === 13); // +4, 13 pontos para 'Tio Hugo'
console.log(set1.scorePoint('Tio Hugo', 5) === 18); // +5, 18 pontos para 'Tio Hugo'

// Ainda não é set point, pois "Tio Hugo" tem 18 pontos e "Não me Toque" tem 3 pontos
console.log(set1.isSetPoint); // false

console.log(set1.scorePoint('Tio Hugo', 6) === 24); // +6, 24 pontos para 'Tio Hugo'

// Agora é set point para 'Tio Hugo', pois ele tem 24 pontos e 'Não me Toque' tem 3 pontos
console.log(set1.isSetPoint); // true

console.log(set1.isOver); // false, o set ainda não terminou
console.log(set1.winner); // undefined, ainda não há um vencedor

console.log(set1.score); // [1, 24] // 1 ponto para 'Não me Toque' e 24 pontos para 'Tio Hugo'

// Todos os sets terminam em 25 pontos -- não vamos aplicar a regra de vantagem para simplificar
console.log(set1.scorePoint('Tio Hugo') === 25); // 25 pontos para 'Tio Hugo', set termina

console.log(set1.isOver); // true, o set terminou
console.log(set1.isRunning); // false, o set não está mais em andamento
console.log(set1.winner); // 'Tio Hugo', o vencedor do set é 'Tio Hugo'
console.log(set1.loser); // 'Não me Toque', o perdedor do set é 'Não me Toque'

// Não deve permitir marcar pontos após o set ter terminado, retorna 25 novamente
console.log(set1.scorePoint('Tio Hugo') === 25);

console.log(set1.isSetPoint); // false, o set já terminou, não é mais set point

console.log(set1.score); // [1, 25] // 1 ponto para 'Não me Toque' e 25 pontos para 'Tio Hugo'

console.log(match.isOver); // false, a partida ainda não terminou, pois só um set foi jogado
console.log(match.winner); // undefined, ainda não há um vencedor da partida

console.log(match.score); // [0, 1] // 'Não me Toque' venceu 0 sets e 'Tio Hugo' venceu 1 set

const set2 = match.newSet(); // Inicia um novo set

// Continuando a pontuação no segundo set
console.log(set2.scorePoint('Não me Toque', 24) === 24); // 24 ponto para 'Não me Toque'
console.log(set2.scorePoint('Tio Hugo', 24) === 24); // 24 ponto para 'Tio Hugo'

// Agora é set point para ambos os times, pois ambos têm 24 pontos
console.log(set2.isSetPoint); // true

// Ainda não é match point, pois a partida termina quando um time vence 3 sets
console.log(set2.isMatchPoint); // false

console.log(set2.scorePoint('Não me Toque') === 25); // 25 ponto para 'Não me Toque', set termina

// Não há regra da vantagem,
// o set termina quando um time chega a 25 pontos, mesmo que o outro time tenha 24 pontos
console.log(set2.isOver); // true, o set terminou
console.log(set2.winner); // 'Não me Toque', o vencedor do set é 'Não me Toque'
console.log(set2.loser); // 'Tio Hugo', o perdedor do set é 'Tio Hugo'

console.log(match.isOver); // false, a partida ainda não terminou, pois cada time venceu um set
console.log(match.winner); // undefined, ainda não há um vencedor da partida
console.log(match.loser); // undefined, ainda não há um perdedor da partida

console.log(match.score); // [1, 1] // "Não me Toque" venceu 1 set e "Tio Hugo" venceu 1 set

console.log(match.sets.length === 2); // true, dois sets foram jogados
console.log(match.sets[0]?.isOver); // true, o primeiro set terminou
console.log(match.sets[1]?.isOver); // true, o segundo set terminou
console.log(match.sets[2]?.isOver); // false, o terceiro set nem foi iniciado

// Continuando a pontuação no terceiro set
const set3 = match.newSet(); // Inicia um novo set

// Marca pontos para 'Tio Hugo' até o set terminar
while (set3.isRunning) {
  console.log(set3.scorePoint('Tio Hugo') === set3.score[1]);
}

console.log(set3.isOver); // true, o set terminou
console.log(set3.winner); // 'Tio Hugo', o vencedor do set é 'Tio Hugo'

// A partida ainda não terminou, pois "Não me Toque" venceu 1 set e "Tio Hugo" venceu 2 sets
console.log(match.isOver); // false
console.log(match.winner); // undefined, ainda não há um vencedor da partida
console.log(match.loser); // undefined, ainda não há um perdedor da partida

console.log(match.score); // [1, 2] // "Não me Toque" venceu 1 set e "Tio Hugo" venceu 2 sets

// TODO:
// - Continuar a pontuação no quarto set, "Não me Toque" vence o quarto set
// - Continuar a pontuação no quinto set, "Tio Hugo" vence o quinto set
// - Verificar que a partida terminou e "Tio Hugo" é o vencedor da partida
// Observação: o 5to set normalmente é jogado até 15 pontos, mas para simplificar,
// deve-se jogar todos os sets até 25 pontos

const match2 = newMatch('Time A', 'Time B');
console.log(match2.newSet() !== undefined); // Deve retornar true, um novo set foi criado
console.log(match2.sets.length === 1);
// Não deve permitir criar um novo set enquanto o set atual não terminou, retorna undefined
console.log(match2.newSet() === undefined);
console.log(match2.sets.length === 1);
console.log(match2.sets[0].score); // [0, 0], a pontuação do set começa em 0 para ambos os times

/*
DESAFIO: Implemente a regra de vantagem, onde um set só termina quando um time tem pelo menos
25 pontos e uma vantagem de 2 pontos sobre o outro time.
Por exemplo, se ambos os times chegarem a 24 pontos, o set continua até que um time tenha 2 pontos
de vantagem (26-24, 27-25, etc.) para levar um ponto extra para o próximo trimestre;
Implementando o 5to set com 15 pontos e vantagem de 2 pontos,
garante mais 0,5 para o próximo trimestre.
*/
