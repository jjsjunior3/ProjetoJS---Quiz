//Initial Data
let currentQuestion = 0; //variável corresponte a questão atual
let correctAnwers = 0; //varável para armazenar questões certas
showQuestion()

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Functions
//função para exibir a questão
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion]; //pegando a questão

        let pct = Math.floor((currentQuestion / questions.length) * 100);//associando cada questão a uma porcentagem para mover a barra de progresso
        document.querySelector('.progress--bar').style.width = `${pct}%`;


        document.querySelector('.scoreArea').style.display = 'none';//limpar a area de finalização
        document.querySelector('.questionArea').style.display = 'block';//aparecer a area de questões

        document.querySelector('.question').innerHTML = q.question; //buscar a questão no arquivos quistões
        
        let optionsHtml = ''; //variavel para armazenar as opções
        
        //lup para buscar as opções e aparecer na tela formatado
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;//exibir as opções

        //Colocando o evento de click nas opções
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}
//função de clique e identificar qual questão foi clicado
function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnwers++;
    } 

    currentQuestion++;
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctAnwers / questions.length) * 100);

    //MODIFICAR A AREA DE RESULTADO CONFORME A PONTUAÇÃO
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim heim!?';
        document.querySelector('.scorePct').style.color = '#FF0000';
    }else if(points >=30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'PARABENS!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnwers}.`;

    document.querySelector('.scoreArea').style.display = 'block';//aparecer a área do resultado
    document.querySelector('.questionArea').style.display = 'none';//ocultar a área de questões
    document.querySelector('.progress--bar').style.width = '100%';//completando a barra de progresso

}
//Função para limpar tudo e reniciar
function resetEvent() {
    currentQuestion = 0;
    correctAnwers = 0;
    showQuestion()
}