import { isHotjarOptionsValid, isVueVersionValid } from './validation';
import { createApp } from 'vue';

describe('validation', () => {
  beforeEach(() => {
    spyOn(console, 'error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  })
  it('isHotjarOptionsValid should print an error that the option ID is invalid', () => {
    const validationResult = isHotjarOptionsValid({
      id: true,
    } as any)
    expect(console.error).toHaveBeenCalledWith('vue-hotjar-next: Hotjar option site id is of type boolean and should be a number or string');
    expect(validationResult).toBeFalsy();
  });

  it('isHotjarOptionsValid should print an error that the option isProduction is has an invalid type', () => {
    const validationResult = isHotjarOptionsValid({
      id: 11111,
      isProduction: 'true'
    } as any)
    expect(console.error).toHaveBeenCalledWith('vue-hotjar-next: Hotjar option isProduction is of type string and should a boolean');
    expect(validationResult).toBeFalsy();
  });

  it('isHotjarOptionsValid should print an error that the option snippetVersion is has an invalid type', () => {
    const validationResult = isHotjarOptionsValid({
      id: 11111,
      snippetVersion: '6'
    } as any)
    expect(console.error).toHaveBeenCalledWith('vue-hotjar-next: Hotjar option snippetVersion is of type string and should a number');
    expect(validationResult).toBeFalsy();
  });

  it('isHotjarOptionsValid should print an error if the option ID is not provided', () => {
    const validationResult = isHotjarOptionsValid({
      id: 11111,
      snippetVersion: '6'
    } as any)
    expect(console.error).toHaveBeenCalledWith('vue-hotjar-next: Hotjar option snippetVersion is of type string and should a number');
    expect(validationResult).toBeFalsy();
  });

  it('isHotjarOptionsValid should be valid', () => {
    const validationResult = isHotjarOptionsValid({
      id: 11111,
    })
    expect(console.error).not.toHaveBeenCalled();
    expect(validationResult).toBeTruthy();
  });

    it('isHotjarOptionsValid should be valid as a string', () => {
    const validationResult = isHotjarOptionsValid({
      id: '11111',
    })
    expect(console.error).not.toHaveBeenCalled();
    expect(validationResult).toBeTruthy();
  });

  it('isVueVersionValid should return true if the Vue version is 3', () => {
    const validationResult = isVueVersionValid(createApp({}))
    expect(validationResult).toBeTruthy();
  });

  it('isVueVersionValid should return true if the Vue version is not 3', () => {
    const app = createApp({})
    app.version = '2.0.0'
    const validationResult = isVueVersionValid(app)
    expect(console.error).toHaveBeenCalledWith('vue-hotjar-next: This plugin is intended to be used with Vue version 3. Version 2.0.0 was detected.');
    expect(validationResult).toBeFalsy();
  });
});



