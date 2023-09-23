export default class ContractExpection extends Error {
  constructor(invalidField?: string | undefined) {
    super(`ContractException: The field ${invalidField} is not well formatted`);
    super.cause = invalidField;
  }
}
