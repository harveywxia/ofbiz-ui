import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', redirect: 'tasks' },
      { route: 'tasks', moduleId: PLATFORM.moduleName('task/task-list'), name: 'tasks' },
      { route: 'new-task', moduleId: PLATFORM.moduleName('task/task'), name: 'new-task' },
      { route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban' },
      { route: 'object-dist', moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'), name: 'object-dist' },
      { route: 'object-dist/publisher', moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'), name: 'publisher' },
      { route: 'object-dist/query-builder', moduleId: PLATFORM.moduleName('objektide_levi/query-builder/query-builder'), name: 'query-builder' }
    ]);
    this.router = router;
  }
}
