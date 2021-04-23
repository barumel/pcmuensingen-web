import Action from './Action';

function DefaultAction(context, prefix) {
  const action = Action({ context, prefix });

  action.addFunction('request');
  action.addFunction('reset');
  action.addFunction('defaults');

  return action;
}

export default DefaultAction;
