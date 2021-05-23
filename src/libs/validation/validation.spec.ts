import * as validation from './validation';
import { hotjarOptions } from '../../types/typing';

describe('HotJar Options Validation', () => {
  describe('id property', () => {
    it('ID should be valid', async () => {
      await expect(validation.id(11111)).resolves.toEqual('valid')
    });
    it('ID should not be valid', async () => {
      await expect(validation.id('11111')).rejects.toEqual(
        'Hotjar option site id is of type string and should a number'
      );
    });
    it('ID is not defined', async () => {
      await expect(validation.id(undefined)).rejects.toEqual(
        'Hotjar Tracking ID is not defined'
      );
    });
  });

  describe('idProduction property', () => {
    it('idProduction should be valid', async () => {
      await expect(validation.isProduction(true)).resolves.toEqual('valid')
    });
    it('idProduction should not be valid due to incorrect type', async () => {
      await expect(validation.isProduction('production')).rejects.toEqual(
        'Hotjar option isProduction is of type string and should a boolean'
      );
    });
  });

  describe('snippetVersion property', () => {
    it('snippetVersion should be valid', async () => {
      await expect(validation.snippetVersion(6)).resolves.toEqual('valid');
    });
    it('snippetVersion should not be valid due to incorrect type', async () => {
      await expect(validation.snippetVersion('6')).rejects.toEqual(
        'Hotjar option snippetVersion is of type string and should a number'
      );
    });
  });
});

describe('Vue Version Validation', () => {
  beforeEach(() => {
    spyOn(console, 'error');
  })
  it('Vue version should be valid', async () => {
    await expect(validation.validateVueVersion('3')).resolves.toEqual(true)
  });
  it('Vue version should be valid', async () => {
    const incorrectVersion = '2.1.1'
    await expect(validation.validateVueVersion(incorrectVersion)).rejects.toEqual(false).then(() => {
      expect(console.error).toHaveBeenCalledWith(`This plugin detected Vue version ${incorrectVersion} but requires Vue 3.x.x`)
    })
  });
});

describe('HotJar Validator', () => {
  beforeEach(() => {
    spyOn(console, 'error');
  });

  it('should ve valid', async () => {
    const hotjarOptions: hotjarOptions = {
      id: 11111,
      isProduction: true
    };
    await expect(
      validation.validateHotjarOptions(hotjarOptions)
    ).resolves.toEqual(true)
  });

  it('should throw an error', async () => {
    // type set to any to test incorrect id
    const hotjarOptions: any = {
      id: '11111',
      isProduction: true
    };
    await expect(validation.validateHotjarOptions(hotjarOptions))
      .rejects.toEqual(false)
      .then(() => {
        expect(console.error).toHaveBeenCalledTimes(1)
      });
  });
});
