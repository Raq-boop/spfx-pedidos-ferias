'use strict';

const build = require('@microsoft/sp-build-web');

// Suprimir a advertência sobre a classe 'ms-Grid' do CSS
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Obtendo a lista de tarefas atuais
var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  // Verificando se a tarefa 'serve-deprecated' existe e mapeando para 'serve'
  if (result.has('serve-deprecated')) {
    // Mapeando 'serve' para 'serve-deprecated', se disponível
    result.set('serve', result.get('serve-deprecated'));
  } else {
    console.log("A tarefa 'serve-deprecated' não foi encontrada.");
  }

  return result;
};

// Inicializando o Gulp com o SPFx
build.initialize(require('gulp'));