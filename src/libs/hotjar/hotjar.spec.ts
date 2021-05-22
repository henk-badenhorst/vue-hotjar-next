import * as HotjarClass from './hotjar';

describe('Should call the HotJar Snippet constructor', () => {
  const hotjarConstructor = jest.spyOn(HotjarClass, 'Hotjar');
  new HotjarClass.Hotjar(123456, 6, true);
  it('constructor should be called', () => {
    expect(hotjarConstructor).toBeCalledTimes(1);
  });
});
