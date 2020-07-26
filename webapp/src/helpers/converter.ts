import LocalIdentifier from '../lseq/identifier';
import LocalTriplet from '../lseq/triplet';
import {Identifier} from '../proto/identifier_pb';
import {Triplet} from '../proto/triplet_pb';

export const localIdentifierToPbIdentifier = (localId: LocalIdentifier):
    Identifier => {
      const identifier = new Identifier()
      const triplets: Triplet[] = []
      localId.triplets.forEach(
          (triplet, i) => {triplets[i] = localTripletToPbTriplet(triplet)})
      identifier.setTripletsList(triplets)
      identifier.setValue(localId.value)
      return identifier
    }

export const pbIdentifierToLocalIdentifier =
    (pbIdentifier: Identifier.AsObject):
        LocalIdentifier => {
          const triplets: LocalTriplet[] = []
          pbIdentifier.tripletsList.forEach(
              (triplet, i) => {triplets[i] = pbTripletToLocalTriplet(triplet)})

          return new LocalIdentifier(pbIdentifier.value, triplets)
        }


export const localTripletToPbTriplet = (localTriplet: LocalTriplet):
    Triplet => {
      const triplet = new Triplet()
      triplet.setCount(localTriplet.count)
      triplet.setPath(localTriplet.path)
      triplet.setSite(localTriplet.site)
      return triplet
    }


export const pbTripletToLocalTriplet =
    (pbTriplet: Triplet.AsObject): LocalTriplet => {
      return new LocalTriplet(pbTriplet.path, pbTriplet.site, pbTriplet.count)
    }