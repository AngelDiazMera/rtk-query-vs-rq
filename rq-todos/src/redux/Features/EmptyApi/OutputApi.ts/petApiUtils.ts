type ComputeRange<
  N extends number,
  Result extends Array<unknown> = []
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;

export type ClientErrorStatus = Exclude<
  ComputeRange<500>[-1],
  ComputeRange<400>[-1]
>;
export type ServerErrorStatus = Exclude<
  ComputeRange<600>[-1],
  ComputeRange<500>[-1]
>;
